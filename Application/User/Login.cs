using System.Net;
using System.Security.AccessControl;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;
using FluentValidation;
using Application.Activities;
using Microsoft.AspNetCore.Identity;
using Application.Errors;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;

            private ILogger<List> _logger { get; }
            public Handler(UserManager<AppUser> userManager,
                SignInManager<AppUser> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }
            public async Task<User> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                
                if(result.Succeeded)
                {
                    // TODO: generate token
                    return new User {
                        DisplayName = user.DisplayName,
                        Token = "This will be a token",
                        UserName = user.UserName,
                        Image = null
                    };
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}