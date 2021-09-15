using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTransHeader : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TransHeader_id",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TransHeader",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    voucher = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    reservationTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransHeader", x => x._id);
                    table.ForeignKey(
                        name: "FK_TransHeader_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransHeader_ReservationTypes_reservationTypeId",
                        column: x => x.reservationTypeId,
                        principalTable: "ReservationTypes",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransHeader_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id");

            migrationBuilder.CreateIndex(
                name: "IX_TransHeader_createdBy",
                table: "TransHeader",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_TransHeader_customerId",
                table: "TransHeader",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_TransHeader_reservationTypeId",
                table: "TransHeader",
                column: "reservationTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_TransHeader_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id",
                principalTable: "TransHeader",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_TransHeader_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropTable(
                name: "TransHeader");

            migrationBuilder.DropIndex(
                name: "IX_ReservationRoomLines_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "TransHeader_id",
                table: "ReservationRoomLines");
        }
    }
}
