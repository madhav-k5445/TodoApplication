using Microsoft.AspNetCore.Mvc;
using TodoApplication.DTO;
using TodoApplication.Interface;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto userDto)
    {
        var result = await _authService.Register(userDto);
        return Ok(result);
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserDto userDto)
    {
        var token = await _authService.Login(userDto);
        return token == "Invalid Credentials" ? Unauthorized(token) : Ok(new { token });
    }
}
