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