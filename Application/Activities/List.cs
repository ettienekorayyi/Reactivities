using MediatR;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Logging;
using Persistence;
using Domain;
using AutoMapper;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private ILogger<List> _logger { get; }
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<List<ActivityDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ToListAsync();
                
                
                return _mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}