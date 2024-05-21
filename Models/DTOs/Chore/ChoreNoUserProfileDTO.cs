using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreNoUserProfileDTO
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Difficulty { get; set; }
    [Required]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignmentNoNavDTO> ChoreAssignments { get; set; }
    public List<ChoreCompletionNoNavDTO> ChoreCompletions { get; set; }
}