using API.Dto.customers;
using API.Dto.functionality.discounts;
using API.Dto.functionality.payments;
using API.Dto.products;
using API.Dto.products.product;
using API.Dto.reservations.header;
using API.Dto.reservations.line;
using API.Dto.reservations.payment;
using API.Dto.reservations.type;
using API.Dto.roles;
using API.Dto.rooms.pricing;
using API.Dto.rooms.room;
using API.Dto.rooms.variant;
using API.Dto.Users;
using API.Models;
using API.Models.functionality;
using API.Models.products;
using API.Models.reservation;
using API.Models.rooms;
using AutoMapper;

namespace API.Data.Profiles
{
    public class resortProfile : Profile
    {
        public resortProfile()
        {
            CreateMap<User, userReadDto>().ReverseMap();
            CreateMap<userCreateDto, User>().ReverseMap();
            CreateMap<userUpdateDto, User>().ReverseMap();

            CreateMap<Role, roleReadDto>().ReverseMap();

            CreateMap<Customer, customerReadDto>().ReverseMap();
            CreateMap<customerUpdateDto, Customer>().ReverseMap();
            CreateMap<customerCreateDto, Customer>().ReverseMap();

            CreateMap<RoomVariant, roomVariantReadDto>().ReverseMap();
            CreateMap<roomVariantUpdateDto, RoomVariant>().ReverseMap();
            CreateMap<roomVariantCreateDto, RoomVariant>().ReverseMap();

            CreateMap<Room, roomReadDto>().ReverseMap();
            CreateMap<roomUpdateDto, Room>().ReverseMap();
            CreateMap<roomCreateDto, Room>().ReverseMap();

            CreateMap<RoomPricing, roomPricingReadDto>().ReverseMap();
            CreateMap<roomPricingUpdateDto, RoomPricing>().ReverseMap();
            CreateMap<roomPricingCreateDto, RoomPricing>().ReverseMap();

            CreateMap<ProductCategory, productCategoryReadDto>().ReverseMap();
            CreateMap<productCategoryUpdateDto, ProductCategory>().ReverseMap();
            CreateMap<productCategoryCreateDto, ProductCategory>().ReverseMap();

            CreateMap<Product, productReadDto>().ReverseMap();
            CreateMap<productUpdateDto, Product>().ReverseMap();
            CreateMap<productCreateDto, Product>().ReverseMap();

            CreateMap<Payment, paymentReadDto>().ReverseMap();
            CreateMap<paymentUpdateDto, Payment>().ReverseMap();
            CreateMap<paymentCreateDto, Payment>().ReverseMap();

            CreateMap<Discount, discountReadDto>().ReverseMap();
            CreateMap<discountUpdateDto, Discount>().ReverseMap();
            CreateMap<discountCreateDto, Discount>().ReverseMap();

            CreateMap<ReservationType, reservationTypeReadDto>().ReverseMap();

            CreateMap<ReservationPayment, reservationPaymentReadDto>().ReverseMap();
            CreateMap<reservationPaymentUpdateDto, ReservationPayment>().ReverseMap();
            CreateMap<reservationPaymentCreateDto, ReservationPayment>().ReverseMap();

            CreateMap<ReservationHeader, reservationHeaderReadDto>().ReverseMap();
            CreateMap<reservationHeaderUpdateDto, ReservationHeader>().ReverseMap();
            CreateMap<reservationHeaderCreateDto, ReservationHeader>().ReverseMap();

            CreateMap<ReservationRoomLine, reservationRoomLineReadDto>().ReverseMap();
            CreateMap<reservationRoomLineUpdateDto, ReservationRoomLine>().ReverseMap();
            CreateMap<reservationRoomLineCreateDto, ReservationRoomLine>().ReverseMap();

        }
    }
}