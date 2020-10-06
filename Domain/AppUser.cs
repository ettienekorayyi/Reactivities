
using System.Collections.Generic;
using System.Security.AccessControl;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<UserActivity> UserActivities { get; set; }

    }
}