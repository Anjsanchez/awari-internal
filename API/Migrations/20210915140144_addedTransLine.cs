using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTransLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_TransHeader_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeader_Customers_customerId",
                table: "TransHeader");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeader_ReservationTypes_reservationTypeId",
                table: "TransHeader");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeader_Users_checkOutBy",
                table: "TransHeader");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeader_Users_createdBy",
                table: "TransHeader");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransHeader",
                table: "TransHeader");

            migrationBuilder.RenameTable(
                name: "TransHeader",
                newName: "TransHeaders");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeader_reservationTypeId",
                table: "TransHeaders",
                newName: "IX_TransHeaders_reservationTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeader_customerId",
                table: "TransHeaders",
                newName: "IX_TransHeaders_customerId");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeader_createdBy",
                table: "TransHeaders",
                newName: "IX_TransHeaders_createdBy");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeader_checkOutBy",
                table: "TransHeaders",
                newName: "IX_TransHeaders_checkOutBy");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransHeaders",
                table: "TransHeaders",
                column: "_id");

            migrationBuilder.CreateTable(
                name: "TransLines",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reservationHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reservationRoomLineId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    seniorPax = table.Column<int>(type: "int", nullable: false),
                    netDiscount = table.Column<float>(type: "real", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_TransLines_Discounts_discountId",
                        column: x => x.discountId,
                        principalTable: "Discounts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TransLines_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransLines_ReservationHeaders_reservationHeaderId",
                        column: x => x.reservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransLines_ReservationRoomLines_reservationRoomLineId",
                        column: x => x.reservationRoomLineId,
                        principalTable: "ReservationRoomLines",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransLines_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransLines_createdBy",
                table: "TransLines",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_TransLines_discountId",
                table: "TransLines",
                column: "discountId");

            migrationBuilder.CreateIndex(
                name: "IX_TransLines_productId",
                table: "TransLines",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_TransLines_reservationHeaderId",
                table: "TransLines",
                column: "reservationHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_TransLines_reservationRoomLineId",
                table: "TransLines",
                column: "reservationRoomLineId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_TransHeaders_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id",
                principalTable: "TransHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeaders_Customers_customerId",
                table: "TransHeaders",
                column: "customerId",
                principalTable: "Customers",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeaders_ReservationTypes_reservationTypeId",
                table: "TransHeaders",
                column: "reservationTypeId",
                principalTable: "ReservationTypes",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeaders_Users_checkOutBy",
                table: "TransHeaders",
                column: "checkOutBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeaders_Users_createdBy",
                table: "TransHeaders",
                column: "createdBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_TransHeaders_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeaders_Customers_customerId",
                table: "TransHeaders");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeaders_ReservationTypes_reservationTypeId",
                table: "TransHeaders");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeaders_Users_checkOutBy",
                table: "TransHeaders");

            migrationBuilder.DropForeignKey(
                name: "FK_TransHeaders_Users_createdBy",
                table: "TransHeaders");

            migrationBuilder.DropTable(
                name: "TransLines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransHeaders",
                table: "TransHeaders");

            migrationBuilder.RenameTable(
                name: "TransHeaders",
                newName: "TransHeader");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeaders_reservationTypeId",
                table: "TransHeader",
                newName: "IX_TransHeader_reservationTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeaders_customerId",
                table: "TransHeader",
                newName: "IX_TransHeader_customerId");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeaders_createdBy",
                table: "TransHeader",
                newName: "IX_TransHeader_createdBy");

            migrationBuilder.RenameIndex(
                name: "IX_TransHeaders_checkOutBy",
                table: "TransHeader",
                newName: "IX_TransHeader_checkOutBy");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransHeader",
                table: "TransHeader",
                column: "_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_TransHeader_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id",
                principalTable: "TransHeader",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeader_Customers_customerId",
                table: "TransHeader",
                column: "customerId",
                principalTable: "Customers",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeader_ReservationTypes_reservationTypeId",
                table: "TransHeader",
                column: "reservationTypeId",
                principalTable: "ReservationTypes",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeader_Users_checkOutBy",
                table: "TransHeader",
                column: "checkOutBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransHeader_Users_createdBy",
                table: "TransHeader",
                column: "createdBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
