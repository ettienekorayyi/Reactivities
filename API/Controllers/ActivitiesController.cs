using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Application.Activities;
using Domain;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id) 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            return await _mediator.Send(new Details.Query { Id = id });
        }
    }
}