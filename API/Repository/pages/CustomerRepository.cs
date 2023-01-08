using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Contracts.pages;
using API.Data;
using API.Data.ApiResponse;
using API.Dto.customers;
using API.Models;
using API.Models.customer;
using API.Models.inventory;
using API.Models.reservation;
using API.Models.user_management;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Repository.pages
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly resortDbContext _db;

        public CustomerRepository(resortDbContext db)
        {
            _db = db;
        }
        public async Task<bool> Create(Customer entity)
        {
            await _db.Customers.AddAsync(entity);
            return await Save();
        }

        public Task<bool> Delete(Customer entity)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Customer>> FindAll(bool isActiveOnly = false)
        {
            var custs = await _db.Customers.Include(n => n.user).ToListAsync();

            if (isActiveOnly)
                custs = custs.Where(n => n.isActive == true).ToList();

            return custs;
        }

        public async Task<Customer> FindById(Guid id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n._id == id);
        }

        public async Task<Customer> getCustomerByCustomerId(long id)
        {
            return await _db.Customers.Include(n => n.user).FirstOrDefaultAsync(n => n.customerid == id);
        }

        private async Task<ICollection<ReservationHeader>> getAllReservationHeader()
        {
            return await _db.ReservationHeaders.ToListAsync();
        }


        public async Task<IEnumerable<CustomerWithActiveBookingReadDto>> GetCustomersWithActiveBooking()
        {
            var custs = await FindAll(true);
            var reservationHdr = await getAllReservationHeader();
            var rTypes = await _db.ReservationTypes.ToListAsync();

            var customersWithHeader = (from p in custs
                                       join c in reservationHdr on p._id equals c.customerId
                                       join t in rTypes on c.reservationTypeId equals t._id
                                       where (c.isActive == true)
                                       select new CustomerWithActiveBookingReadDto { Customer = p, headerId = c._id, typeName = t.name });

            return customersWithHeader;
        }

        public async Task<bool> Save()
        {
            var changes = await _db.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Update(Customer entity)
        {
            _db.Customers.Update(entity);
            return await Save();
        }

        public async Task<IEnumerable<Customer>> GetCustomersWithImage(HttpRequest request)
        {
            var custs = await FindAll();

            return custs.Select(n => new Customer()
            {
                _id = n._id,
                customerid = n.customerid,
                firstName = n.firstName,
                lastName = n.lastName,
                address = n.address,
                mobile = n.mobile,
                birthday = n.birthday,
                createdDate = n.createdDate,
                ImageFile = n.ImageFile,
                ImageName = n.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/customers/{3}", request.Scheme, request.Host, request.PathBase, n.ImageName),
                isActive = n.isActive,
                points = n.points,
                cardAmount = n.cardAmount,
                emailAddress = n.emailAddress,
                user = n.user,
                userId = n.userId
            });
        }

        public async Task<List<Vendor>> GetVendors(bool isActiveOnly = false)
        {
            try
            {
                var datas = await _db.Vendors
                .ToListAsync();

                if (isActiveOnly)
                    datas = datas.Where(n => n.IsActive == true).ToList();

                return datas;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ResultResponse> UpsertVendors(Vendor data)
        {
            try
            {
                var res = await _db.Vendors
                    .FirstOrDefaultAsync(n => n._id == data._id);

                if (res == null)
                {
                    var DataIfNameExist = await _db.Vendors
                    .FirstOrDefaultAsync(n => n.Name.ToLower() == data.Name.ToLower());

                    if (DataIfNameExist != null)
                    {
                        return new ResultResponse()
                        {
                            message = "Name already exist in the database.",
                            result = result.error
                        };
                    }

                    data._id = new Guid();
                    data.CreatedDate = DateTime.Now;
                    await _db.Vendors.AddAsync(data);
                }
                else
                {
                    res.IsActive = data.IsActive;
                    res.Address = data.Address;
                    res.EmailAddress = data.EmailAddress;
                    res.Mobile = data.Mobile;
                    res.Name = data.Name;
                    _db.Vendors.Update(res);
                }

                await _db.SaveChangesAsync();

                return new ResultResponse() { result = result.success };
            }
            catch (System.Exception ex)
            {
                return new ResultResponse()
                {
                    message = ex.Message,
                    result = result.error
                };
            }
        }
    }
}