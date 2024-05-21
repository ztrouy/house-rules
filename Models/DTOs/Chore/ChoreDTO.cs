using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Difficulty { get; set; }
    [Required]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignmentEmbedUserProfileDTO> ChoreAssignments { get; set; }
    public List<ChoreCompletionEmbedUserProfileDTO> ChoreCompletions { get; set; }
}