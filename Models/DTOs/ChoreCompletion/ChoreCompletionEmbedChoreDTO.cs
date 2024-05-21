using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreCompletionEmbedChoreDTO
{
    public int Id { get; set; }
    [Required]
    public int UserProfileId { get; set; }
    [Required]
    public int ChoreId { get; set; }
    [Required]
    public DateTime CompletedOn { get; set; }
    public ChoreNoNavDTO Chore { get; set; }
}