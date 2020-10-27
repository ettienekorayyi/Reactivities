using System.Security.Cryptography.X509Certificates;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;
            //private ILogger<List> _logger { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Profile> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                return new Profile 
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
            }
        }
    }
}