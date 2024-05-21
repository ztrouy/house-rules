using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreAssignmentEmbedChoreDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public int ChoreId { get; set; }
    public ChoreNoNavDTO Chore { get; set; }
}