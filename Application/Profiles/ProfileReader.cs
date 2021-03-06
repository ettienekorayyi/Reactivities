using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if(user == null) 
                throw new RestException(HttpStatusCode.NotFound, new { User = "User not found."});
            
            var currentUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                Photos = user.Photos,
                Bio = user.Bio,
                FollowersCount = user.Followers.Count(),
                FollowingsCount = user.Followings.Count()
            };

            if(currentUser.Followings.Any(x => x.TargetId == user.Id)) 
                profile.IsFollowed = true;

            return profile;
        }
    }
}