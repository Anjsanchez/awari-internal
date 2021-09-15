using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.trans;
using API.Data;
using API.Dto.trans.header;
using API.Models.trans;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.trans
{
    public class TransHeaderRepository : ITransHeaderRepository
    {
        private readonly resortDbContext _db;


        public TransHeaderRepository(resortDbContext db)
        {
            _db = db;
        }

        public async Task<bool> Create(TransHeader entity)
        {
            await _db.TransHeaders.AddAsync(entity);
            return await Save();
        }

        public async Task<bool> Delete(TransHeader entity)
        {
            _db.TransHeaders.Remove(entity);
            return await Save();
        }

        public async Task<ICollection<TransHeader>> FindAll(bool isActiveOnly = false)
        {
            return await _db.TransHeaders
                        .Include(n => n.Customer)
                        .Include(n => n.reservationType)
                        .Include(n => n.user)
                        .ToListAsync();
        }

        public async Task<TransHeader> FindById(Guid id)
        {
            return await _db.TransHeaders
                            .Include(n => n.Customer)
                            .Include(n => n.reservationType)
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }


        public async Task<List<TransHeader>> GetHeaderByCustomerID(Guid customerId)
        {
            var xpayments = await FindAll();

            var z = xpayments.Where(n => n.customerId == customerId).ToList();

            return z;
        }

        public async Task<TransHeader> GetHeadersWithFullDetails(Guid HeaderId)
        {
            var headers = await _db.TransHeaders
                .Include(n => n.Customer)
                .Include(n => n.reservationType)
                .Include(n => n.user)
                .FirstOrDefaultAsync(n => n._id == HeaderId);



            return headers;
        }

        public async Task<List<transHeaderReadDto>> GetHeaderWithRoomCount()
        {

            var headerWithRoomCount = await _db.TransHeaders.Select(a => new transHeaderReadDto
            {
                _id = a._id,
                Customer = a.Customer,
                reservationType = a.reservationType,
                user = a.user,
                userCheckOut = a.userCheckOut,
                voucher = a.voucher,
                checkOutDate = a.checkOutDate,
                createdDate = a.createdDate,
                roomCount = a.TransRoom.Count(),
            })
            .ToListAsync();

            return headerWithRoomCount;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(TransHeader entity)
        {
            _db.TransHeaders.Update(entity);
            return await Save();
        }
    }
}