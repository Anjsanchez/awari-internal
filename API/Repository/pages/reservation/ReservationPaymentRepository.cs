using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages.reservation;
using API.Data;
using API.Models.reservation;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages.reservation
{
    public class ReservationPaymentRepository : IReservationPaymentRepository
    {
        private readonly resortDbContext _db;

        public ReservationPaymentRepository(resortDbContext db)
        {
            _db = db;
        }


        public async Task<bool> Create(ReservationPayment entity)
        {
            await _db.ReservationPayments.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(ReservationPayment entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<ReservationPayment>> FindAll()
        {
            return await _db.ReservationPayments
                        .Include(n => n.reservationHeader)
                        .Include(n => n.payment)
                        .Include(n => n.user)
                         .ToListAsync();
        }

        public async Task<ReservationPayment> FindById(Guid id)
        {
            return await _db.ReservationPayments
                            .Include(n => n.reservationHeader)
                            .Include(n => n.payment)
                            .Include(n => n.user)
                            .FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<List<ReservationPayment>> GetPaymentByHeaderId(Guid headerId)
        {
            var xpayments = await FindAll();

            var z = xpayments.Where(n => n.reservationHeaderId == headerId).ToList();

            return z;
        }


        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(ReservationPayment entity)
        {
            _db.ReservationPayments.Update(entity);
            return await Save();
        }
    }
}