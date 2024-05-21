using System.ComponentModel.DataAnnotations.Schema;

namespace HouseRules.Models.DTOs;

public class UserProfileNoNavDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string IdentityUserId { get; set; }
}