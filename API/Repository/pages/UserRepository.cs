using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly resortDbContext _db;

        public UserRepository(resortDbContext db)
        {
            _db = db;
        }
        public async Task<bool> Create(User entity)
        {
            await _db.Users.AddAsync(entity);
            return await Save();
        }
        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public Task<bool> Delete(User entity)
        {
            throw new System.NotImplementedException();
        }

        public async Task<ICollection<User>> FindAll()
        {
            var Users = await _db.Users
                .Include(q => q.Role)
                .ToListAsync();
            return Users;
        }

        public async Task<User> FindById(Guid id)
        {
            return await _db.Users
                            .Include(q => q.Role)
                            .FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<User> getUserByUsernameOrEmail(string username, string email)
        {
            User user;
            var users = await FindAll();

            user = users.FirstOrDefault(q => q.Username.ToLower() == username.ToLower());

            if (user == null) //find via email
                user = users.FirstOrDefault(q => q.EmailAddress.ToLower() == email.ToLower());

            return user == null ? null : user;
        }


        public Task<bool> isExists(int id)
        {
            throw new System.NotImplementedException();
        }



        public async Task<bool> Update(User entity)
        {
            _db.Users.Update(entity);
            return await Save();
        }
    }
}