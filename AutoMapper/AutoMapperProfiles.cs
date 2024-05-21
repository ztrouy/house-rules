using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<UserProfile, UserProfileDTO>();
        CreateMap<UserProfile, UserProfileNoRolesDTO>();
        CreateMap<UserProfile, UserProfileNoIdentityUserOrRolesDTO>();
        CreateMap<Chore, ChoreDTO>();
        CreateMap<Chore, ChoreNoNavDTO>();
        CreateMap<ChoreAssignment, ChoreAssignmentDTO>();
        CreateMap<ChoreAssignment, ChoreAssignmentEmbedChoreDTO>();
        CreateMap<ChoreAssignment, ChoreAssignmentEmbedUserProfileDTO>();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>();
        CreateMap<ChoreCompletion, ChoreCompletionEmbedChoreDTO>();
        CreateMap<ChoreCompletion, ChoreCompletionEmbedUserProfileDTO>();
    }
}