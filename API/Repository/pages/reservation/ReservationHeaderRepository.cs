using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data;
using API.Dto.reservations.header;
using API.Models.reservation;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.reservation
{
    public class ReservationHeaderRepository : IReservationHeaderRepository
    {
        private readonly resortDbContext _db;


        public ReservationHeaderRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(ReservationHeader entity)
        {
            await _db.ReservationHeaders.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ReservationHeader entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ReservationHeader>> FindAll()
        {
            return await _db.ReservationHeaders
                        .Include(n => n.Customer)
                        .Include(n => n.reservationType)
                        .Include(n => n.user)
                        .ToListAsync();
        }

        public async Task<ReservationHeader> FindById(Guid id)
        {
            return await _db.ReservationHeaders
                            .Include(n => n.Customer)
                            .Include(n => n.reservationType)
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<ReservationHeader>> GetHeaderByCustomerID(Guid customerId)
        {
            var xpayments = await FindAll();

            var z = xpayments.Where(n => n.customerId == customerId).ToList();

            return z;
        }

        public async Task<ReservationHeader> GetHeadersWithFullDetails(Guid HeaderId)
        {
            var headers = await _db.ReservationHeaders
                .Include(n => n.Customer)
                .Include(n => n.reservationType)
                .Include(n => n.user)
                .FirstOrDefaultAsync(n => n._id == HeaderId);



            return headers;
        }

        public async Task<List<reservationHeaderReadDto>> GetHeaderWithRoomCount()
        {

            var headerWithRoomCount = await _db.ReservationHeaders.Select(a => new reservationHeaderReadDto
            {
                _id = a._id,
                Customer = a.Customer,
                reservationType = a.reservationType,
                user = a.user,
                voucher = a.voucher,
                createdDate = a.createdDate,
                roomCount = a.ReservationRoomLine.Count(),
            })
            .ToListAsync();

            return headerWithRoomCount;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationHeader entity)
        {
            _db.ReservationHeaders.Update(entity);
            return await Save();
        }
    }
}