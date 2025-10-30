using Microsoft.AspNetCore.Mvc;
using KitchenStoreAPI.Data;
using KitchenStoreAPI.Models;

namespace KitchenStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CategoriesController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Categories.ToList());

        [HttpPost]
        public IActionResult Create(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }
    }
}