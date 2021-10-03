using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Contracts.pages.Others;
using API.Data;
using API.Models.Others;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.others
{
    public class TravelAgencyRepository : ITravelAgencyRepository
    {
        private readonly resortDbContext _db;

        public TravelAgencyRepository(resortDbContext db)
        {
            _db = db;
        }

        public Task<bool> Create(TravelAgency entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(TravelAgency entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<TravelAgency>> FindAll(bool isActiveOnly = false)
        {
            return await _db.TravelAgencies.ToListAsync();
        }

        public Task<TravelAgency> FindById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<TravelAgency> GetAgencyByName(string name)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save()
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(TravelAgency entity)
        {
            throw new NotImplementedException();
        }
    }
}