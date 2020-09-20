using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List() 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid id) 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command) 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id,Edit.Command command) 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) 
        {
            // API controller for getting a list of activities
            // It keeps our API controller extremely dumb
            return await Mediator.Send(new Delete.Command { Id = id });
        }

    }
}