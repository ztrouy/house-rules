using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreDTO
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100, ErrorMessage = "Chore names must be 100 characters or less")]
    public string Name { get; set; }
    [Required]
    [Range(1,5)]
    public int Difficulty { get; set; }
    [Required]
    [Range(1, 28)]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignmentEmbedUserProfileDTO> ChoreAssignments { get; set; }
    public List<ChoreCompletionEmbedUserProfileDTO> ChoreCompletions { get; set; }
    public ChoreCompletionEmbedUserProfileDTO MostRecentCompletion => ChoreCompletions.OrderByDescending(cc => cc.CompletedOn).FirstOrDefault();
}