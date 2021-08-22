using System;
using System.Threading.Tasks;
using API.Contracts;
using API.Data;
using API.Models;

namespace API.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly resortDbContext _context;
        private IGenericRepository<User> _users;

        public UnitOfWork(resortDbContext context)
        {
            _context = context;
        }

        public IGenericRepository<User> Users
            => _users ??= new GenericRepository<User>(_context);

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool dispose)
        {
            if (dispose)
            {
                _context.Dispose();
            }
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}