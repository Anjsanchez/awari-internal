using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models.reservation;

namespace API.Contracts.pages.reservation
{
    public interface IReservationPaymentRepository : IRepositoryBase<ReservationPayment>
    {
        Task<List<ReservationPayment>> GetPaymentByHeaderId(Guid headerId);
    }
}