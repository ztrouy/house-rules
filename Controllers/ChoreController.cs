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
}