using TodoApplication.DTO;
using System.Threading.Tasks;

namespace TodoApplication.Interface
{
    public interface IAuthService
    {
        Task<string> Login(UserDto userDto);
        Task<string> Register(UserDto userDto);
    }
}
