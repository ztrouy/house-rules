using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreAssignmentEmbedUserProfileDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public int ChoreId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
}