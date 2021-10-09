using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedApprovalRoomTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "approvalStatus",
                table: "ReservationRoomLines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ApprovalRooms",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    startDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    reservationTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    grossAmount = table.Column<float>(type: "real", nullable: false),
                    totalDiscount = table.Column<float>(type: "real", nullable: false),
                    totalAmount = table.Column<float>(type: "real", nullable: false),
                    adultPax = table.Column<int>(type: "int", nullable: false),
                    seniorPax = table.Column<int>(type: "int", nullable: false),
                    childrenPax = table.Column<int>(type: "int", nullable: false),
                    mattress = table.Column<int>(type: "int", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalRooms", x => x._id);
                    table.ForeignKey(
                        name: "FK_ApprovalRooms_Discounts_discountId",
                        column: x => x.discountId,
                        principalTable: "Discounts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApprovalRooms_ReservationTypes_reservationTypeId",
                        column: x => x.reservationTypeId,
                        principalTable: "ReservationTypes",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalRooms_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRooms_discountId",
                table: "ApprovalRooms",
                column: "discountId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRooms_reservationTypeId",
                table: "ApprovalRooms",
                column: "reservationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRooms_roomId",
                table: "ApprovalRooms",
                column: "roomId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalRooms");

            migrationBuilder.DropColumn(
                name: "approvalStatus",
                table: "ReservationRoomLines");
        }
    }
}
