using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedTransTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApprovalTrans",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reservationRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    productId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    seniorPax = table.Column<int>(type: "int", nullable: false),
                    netDiscount = table.Column<float>(type: "real", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalTrans", x => x._id);
                    table.ForeignKey(
                        name: "FK_ApprovalTrans_Discounts_discountId",
                        column: x => x.discountId,
                        principalTable: "Discounts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApprovalTrans_Products_productId",
                        column: x => x.productId,
                        principalTable: "Products",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalTrans_Rooms_reservationRoomId",
                        column: x => x.reservationRoomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTrans_discountId",
                table: "ApprovalTrans",
                column: "discountId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTrans_productId",
                table: "ApprovalTrans",
                column: "productId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalTrans_reservationRoomId",
                table: "ApprovalTrans",
                column: "reservationRoomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalTrans");
        }
    }
}
