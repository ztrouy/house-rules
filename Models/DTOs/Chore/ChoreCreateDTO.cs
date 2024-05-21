using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class ChoreCreateDTO
{
    [Required]
    public string Name { get; set; }
    [Required]
    public int Difficulty { get; set; }
    [Required]
    public int ChoreFrequencyDays { get; set; }
}