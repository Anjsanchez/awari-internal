using API.Dto.customers;
using API.Dto.functionality.discounts;
using API.Dto.functionality.payments;
using API.Dto.products;
using API.Dto.products.product;
using API.Dto.products.type;
using API.Dto.reservations.header;
using API.Dto.reservations.room;
using API.Dto.reservations.payment;
using API.Dto.reservations.trans;
using API.Dto.reservations.type;
using API.Dto.roles;
using API.Dto.rooms.pricing;
using API.Dto.rooms.room;
using API.Dto.rooms.variant;
using API.Dto.trans.header;
using API.Dto.Users;
using API.Models;
using API.Models.functionality;
using API.Models.products;
using API.Models.reservation;
using API.Models.rooms;
using API.Models.trans;
using AutoMapper;
using API.Dto.trans.payment;
using API.Dto.trans.room;
using API.Dto.trans.line;
using API.Models.employee;
using API.Dto.Users.roles;
using API.Dto.approval;
using API.Models.approval;
using API.Dto.approval.payment;
using API.Dto.approval.trams;
using API.Dto.approval.header;
using API.Dto.inventory;
using API.Models.inventory;
using API.Models.user_management;
using System.Collections.Generic;

namespace API.Data.Profiles
{
    public class resortProfile : Profile
    {
        public resortProfile()
        {
            CreateMap<employeeRole, employeeRoleReadDto>().ReverseMap();
            CreateMap<employeeRoleCreateDto, employeeRole>().ReverseMap();
            CreateMap<employeeRoleUpdateDto, employeeRole>().ReverseMap();

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

            CreateMap<BomLineDto, BomLine>().ReverseMap();
            CreateMap<VendorDto, Vendor>().ReverseMap();
            CreateMap<InventoryMasterDto, InventoryMaster>().ReverseMap();
            CreateMap<InventoryTypeDto, InventoryType>().ReverseMap();
            CreateMap<InventoryUnitDto, InventoryUnit>().ReverseMap();

            CreateMap<ProductType, productTypeReadDto>().ReverseMap();
            CreateMap<productTypeUpdateDto, ProductType>().ReverseMap();
            CreateMap<productTypeCreateDto, ProductType>().ReverseMap();

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

            CreateMap<WorkOrder, WorkOrderReadDto>().ReverseMap();
            CreateMap<WorkOrderUpdateDto, WorkOrder>().ReverseMap();
            CreateMap<WorkOrderCreateDto, WorkOrder>().ReverseMap();
            //
            CreateMap<InventoryAdjustment, InventoryAdjustmentHeaderReadDto>().ReverseMap();
            CreateMap<InventoryAdjustmentLines, InvAdjustmentLinesReadDto>().ReverseMap();
             CreateMap<InvAdjApprovalUpdateDto, InventoryAdjustment>().ReverseMap();
            CreateMap<InvAdjHeaderCreateDto, InventoryAdjustment>().ReverseMap();
            CreateMap<InvAdjLineCreateDto, InventoryAdjustmentLines>().ReverseMap();


            CreateMap<PurchaseOrder, PurchaseOrderHeaderReadDto>().ReverseMap();
            CreateMap<PurchaseOrderLines, PurchaseOrderLinesReadDto>().ReverseMap();
            CreateMap<PurchaseOrderApprovalUpdateDto, PurchaseOrder>().ReverseMap();
            CreateMap<PurchaseOrderHeaderCreateDto, PurchaseOrder>().ReverseMap();
            CreateMap<PurchaseOrderLineCreateDto, PurchaseOrderLines>().ReverseMap();

            CreateMap<PurchaseReq, PurchaseReqHeaderReadDto>().ReverseMap();

            CreateMap<PurchaseOrderReceivedUpdateDto, PurchaseOrder>().ReverseMap();
            CreateMap<PurchaseOrderLineApprovalUpdateDto, PurchaseOrderLines>().ReverseMap();
            CreateMap<PurchaseReqApprovalUpdateDto, PurchaseReq>().ReverseMap();
            CreateMap<PurchaseReqHeaderCreateDto, PurchaseReq>().ReverseMap();
            CreateMap<PurchaseReqLineCreateDto, PurchaseReqLines>().ReverseMap();

            CreateMap<ReservationHeader, reservationHeaderReadDto>().ReverseMap();
            CreateMap<reservationHeaderUpdateDto, ReservationHeader>().ReverseMap();
            CreateMap<reservationHeaderCreateDto, ReservationHeader>().ReverseMap();

            CreateMap<ReservationRoomLine, reservationRoomLineReadDto>().ReverseMap();
            CreateMap<reservationRoomLineUpdateDto, ReservationRoomLine>().ReverseMap();
            CreateMap<reservationRoomLineCreateDto, ReservationRoomLine>().ReverseMap();

            CreateMap<ReservationTransLine, reservationTransReadDto>().ReverseMap();
            CreateMap<reservationTransUpdateDto, ReservationTransLine>().ReverseMap();
            CreateMap<reservationTransCreateDto, ReservationTransLine>().ReverseMap();


            CreateMap<TransHeader, transHeaderReadDto>().ReverseMap();
            CreateMap<transHeaderCreateDto, TransHeader>().ReverseMap();

            CreateMap<TransPayment, transPaymentReadDto>().ReverseMap();
            CreateMap<transPaymentCreateDto, TransPayment>().ReverseMap();

            CreateMap<TransRoom, transRoomReadDto>().ReverseMap();
            CreateMap<transRoomCreateDto, TransRoom>().ReverseMap();

            CreateMap<TransLine, transReadDto>().ReverseMap();
            CreateMap<transCreateDto, TransLine>().ReverseMap();

            CreateMap<ReservationHeader, transHeaderCreateDto>().ReverseMap();


            CreateMap<ReservationApproval, ReservationApprovalCreateDto>().ReverseMap();
            CreateMap<ReservationApproval, ReservationApprovalReadDto>().ReverseMap();
            CreateMap<ApprovalPaymentCreateDto, ApprovalPayment>().ReverseMap();
            CreateMap<ApprovalPaymentReadDto, ApprovalPayment>().ReverseMap();

            CreateMap<ApprovalHeaderCreateDto, ApprovalHeader>().ReverseMap();
            CreateMap<ApprovalHeaderReadDto, ApprovalHeader>().ReverseMap();

            CreateMap<ApprovalTransCreateDto, ApprovalTrans>().ReverseMap();
            CreateMap<ApprovalTransReadDto, ApprovalTrans>().ReverseMap();
            CreateMap<reservationTransCreateDto, ApprovalTrans>().ReverseMap();

            CreateMap<ApprovalRoomCreateDto, ApprovalRoom>().ReverseMap();
            CreateMap<ApprovalRoomReadDto, ApprovalRoom>().ReverseMap();
            CreateMap<ReservationRoomLine, ApprovalRoom>().ReverseMap();
            CreateMap<ReservationTransLine, ApprovalTransCreateDto>().ReverseMap();
            CreateMap<ReservationTransLine, reservationTransDiscountUpdate>().ReverseMap();
            CreateMap<ReservationTransLine, ApprovalTrans>().ReverseMap();

            CreateMap<ReservationHeader, ApprovalTrans>().ReverseMap();

        }
    }
}