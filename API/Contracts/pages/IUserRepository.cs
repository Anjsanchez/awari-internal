using System.Threading.Tasks;
using API.Models;

namespace API.Contracts
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<User> getUserByUsernameOrEmail(string username, string email);
    }
}