using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using TodoApplication.Data;
using TodoApplication.Models;

namespace TodoApplication.Controllers
{
    [Authorize]
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public TaskController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTaskList()
        {
            try
            {
                var tasks = _context.Tasks.ToList();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while fetching tasks", error = ex.Message });
            }
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (!int.TryParse(id, out var taskId)) {
                return BadRequest("Invalid entry");
            }

            try
            {
                var tasks = _context.Tasks.Find(taskId);
                if (tasks == null)
                {
                    return NotFound("No Data Found");
                }
                _context.Tasks.Remove(tasks);
                _context.SaveChanges();
                var newtasklist = this.GetTaskList();
                return Ok(newtasklist);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Message = "An error occured while deleting the task",
                    error = ex.Message
                });
            }
        }

        [HttpPost]
        public IActionResult AddTask([FromBody] TaskItem task)
        {
            if (task == null)
            {
                return BadRequest(new { message = "Task data is required" });
            }



            try
            {
                // Ensure the Id is not manually set
                var newTask = new TaskItem
                {
                    Description = task.Description // Assign only required fields
                };

                _context.Tasks.Add(newTask);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetTaskList), new { id = newTask.Id }, newTask);
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Database update error", error = dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while adding the task", error = ex.Message });
            }
        }
    }
}
