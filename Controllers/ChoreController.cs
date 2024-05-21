using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using HouseRules.Models;
using HouseRules.Models.DTOs;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace HouseRules.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get(IMapper mapper)
    {
        List<ChoreNoNavDTO> choreDTOs = _dbContext.Chores
            .ProjectTo<ChoreNoNavDTO>(mapper.ConfigurationProvider)
            .ToList();
        
        return Ok(choreDTOs);
    }

    [HttpGet("id")]
    [Authorize]
    public IActionResult GetSingle(int id, IMapper mapper)
    {
        ChoreNoUserProfileDTO choreDTO = _dbContext.Chores
            .ProjectTo<ChoreNoUserProfileDTO>(mapper.ConfigurationProvider)
            .SingleOrDefault(c => c.Id == id);
        
        if (choreDTO == null)
        {
            return NotFound();
        }

        return Ok(choreDTO);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult Create(ChoreCreateDTO chore)
    {
        Chore newChore = new Chore()
        {
            Name = chore.Name,
            Difficulty = chore.Difficulty,
            ChoreFrequencyDays = chore.ChoreFrequencyDays
        };

        _dbContext.Chores.Add(newChore);
        _dbContext.SaveChanges();

        ChoreNoNavDTO choreDTO = new ChoreNoNavDTO()
        {
            Id = newChore.Id,
            Name = newChore.Name,
            Difficulty = newChore.Difficulty,
            ChoreFrequencyDays = newChore.ChoreFrequencyDays
        };

        return Created($"api/Chore/{choreDTO.Id}", choreDTO);
    }

    [HttpPut("id")]
    [Authorize(Roles = "Admin")]
    public IActionResult Update(int id, ChoreUpdateDTO update)
    {
        if (update.Id != id)
        {
            return BadRequest("Submitted chore has incorrect Id");
        }
        
        Chore foundChore = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (foundChore == null)
        {
            return NotFound();
        }

        foundChore.Name = update.Name;
        foundChore.Difficulty = update.Difficulty;
        foundChore.ChoreFrequencyDays = update.ChoreFrequencyDays;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("id")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id)
    {
        Chore choreToDelete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Chores.Remove(choreToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/assign")]    
    [Authorize(Roles = "Admin")]
    public IActionResult Assign(int id, int? userId)
    {
        if (userId == null)
        {
            return BadRequest("You didn't assign anyone to the chore!");
        }

        Chore choreToAssign = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToAssign == null)
        {
            return NotFound("No chore with that Id was found");
        }
        UserProfile userProfileToAssign = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (userProfileToAssign == null)
        {
            return NotFound("No user with that Id was found!");
        }

        ChoreAssignment existingChoreAssignment = _dbContext.ChoreAssignments.SingleOrDefault(ca => ca.ChoreId == choreToAssign.Id && ca.UserProfileId == userProfileToAssign.Id);
        if (existingChoreAssignment != null)
        {
            return Conflict("That user has already been assigned this chore!");
        }

        ChoreAssignment newChoreAssignment = new ChoreAssignment()
        {
            ChoreId = choreToAssign.Id,
            UserProfileId = userProfileToAssign.Id
        };

        _dbContext.ChoreAssignments.Add(newChoreAssignment);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult Complete(int id, int? userId, IMapper mapper)
    {
        Chore foundChore = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (foundChore == null)
        {
            return BadRequest("Chore not found");
        }
        UserProfile foundUserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == userId);
        if (foundUserProfile == null)
        {
            return BadRequest("User not found");
        }
        
        ChoreCompletion choreCompletion = new ChoreCompletion()
        {
            ChoreId = foundChore.Id,
            UserProfileId = foundUserProfile.Id,
            CompletedOn = DateTime.Now
        };
        _dbContext.ChoreCompletions.Add(choreCompletion);
        _dbContext.SaveChanges();

        return NoContent();
    }
}