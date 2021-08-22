using System;
using System.Threading.Tasks;
using API.Models;

namespace API.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<User> Users { get; }
        Task Save();
    }
}