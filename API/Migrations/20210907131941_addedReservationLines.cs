using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedReservationLines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservationTransLines",
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
                    table.PrimaryKey("PK_ReservationTransLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationTransLines_Discounts_discountId",
                        column: x => x.discountId,
                        principalTable: "Discounts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReservationTransLines_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationTransLines_ReservationHeaders_reservationHeaderId",
                        column: x => x.reservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationTransLines_ReservationRoomLines_reservationRoomLineId",
                        column: x => x.reservationRoomLineId,
                        principalTable: "ReservationRoomLines",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationTransLines_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationTransLines_createdBy",
                table: "ReservationTransLines",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationTransLines_discountId",
                table: "ReservationTransLines",
                column: "discountId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationTransLines_productId",
                table: "ReservationTransLines",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationTransLines_reservationHeaderId",
                table: "ReservationTransLines",
                column: "reservationHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationTransLines_reservationRoomLineId",
                table: "ReservationTransLines",
                column: "reservationRoomLineId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationTransLines");
        }
    }
}
