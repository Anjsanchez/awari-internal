using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTransTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationRoomLines_TransHeaders_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_ReservationHeaders_reservationHeaderId",
                table: "TransLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_ReservationRoomLines_reservationRoomLineId",
                table: "TransLines");

            migrationBuilder.DropIndex(
                name: "IX_ReservationRoomLines_TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.DropColumn(
                name: "TransHeader_id",
                table: "ReservationRoomLines");

            migrationBuilder.RenameColumn(
                name: "reservationRoomLineId",
                table: "TransLines",
                newName: "transRoomId");

            migrationBuilder.RenameColumn(
                name: "reservationHeaderId",
                table: "TransLines",
                newName: "transHeaderId");

            migrationBuilder.RenameIndex(
                name: "IX_TransLines_reservationRoomLineId",
                table: "TransLines",
                newName: "IX_TransLines_transRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_TransLines_reservationHeaderId",
                table: "TransLines",
                newName: "IX_TransLines_transHeaderId");

            migrationBuilder.CreateTable(
                name: "TransPayments",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    amount = table.Column<float>(type: "real", nullable: false),
                    paymentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    paymentRefNum = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransPayments", x => x._id);
                    table.ForeignKey(
                        name: "FK_TransPayments_Payments_paymentId",
                        column: x => x.paymentId,
                        principalTable: "Payments",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransPayments_TransHeaders_transHeaderId",
                        column: x => x.transHeaderId,
                        principalTable: "TransHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_TransPayments_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "TransRooms",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    discountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    startDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    roomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    grossAmount = table.Column<float>(type: "real", nullable: false),
                    totalDiscount = table.Column<float>(type: "real", nullable: false),
                    totalAmount = table.Column<float>(type: "real", nullable: false),
                    adultPax = table.Column<int>(type: "int", nullable: false),
                    seniorPax = table.Column<int>(type: "int", nullable: false),
                    childrenPax = table.Column<int>(type: "int", nullable: false),
                    mattress = table.Column<int>(type: "int", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransRooms", x => x._id);
                    table.ForeignKey(
                        name: "FK_TransRooms_Discounts_discountId",
                        column: x => x.discountId,
                        principalTable: "Discounts",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TransRooms_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransRooms_TransHeaders_transHeaderId",
                        column: x => x.transHeaderId,
                        principalTable: "TransHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransRooms_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransPayments_createdBy",
                table: "TransPayments",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_TransPayments_paymentId",
                table: "TransPayments",
                column: "paymentId");

            migrationBuilder.CreateIndex(
                name: "IX_TransPayments_transHeaderId",
                table: "TransPayments",
                column: "transHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_TransRooms_createdBy",
                table: "TransRooms",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_TransRooms_discountId",
                table: "TransRooms",
                column: "discountId");

            migrationBuilder.CreateIndex(
                name: "IX_TransRooms_roomId",
                table: "TransRooms",
                column: "roomId");

            migrationBuilder.CreateIndex(
                name: "IX_TransRooms_transHeaderId",
                table: "TransRooms",
                column: "transHeaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_TransHeaders_transHeaderId",
                table: "TransLines",
                column: "transHeaderId",
                principalTable: "TransHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines",
                column: "transRoomId",
                principalTable: "TransRooms",
                principalColumn: "_id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_TransHeaders_transHeaderId",
                table: "TransLines");

            migrationBuilder.DropForeignKey(
                name: "FK_TransLines_TransRooms_transRoomId",
                table: "TransLines");

            migrationBuilder.DropTable(
                name: "TransPayments");

            migrationBuilder.DropTable(
                name: "TransRooms");

            migrationBuilder.RenameColumn(
                name: "transRoomId",
                table: "TransLines",
                newName: "reservationRoomLineId");

            migrationBuilder.RenameColumn(
                name: "transHeaderId",
                table: "TransLines",
                newName: "reservationHeaderId");

            migrationBuilder.RenameIndex(
                name: "IX_TransLines_transRoomId",
                table: "TransLines",
                newName: "IX_TransLines_reservationRoomLineId");

            migrationBuilder.RenameIndex(
                name: "IX_TransLines_transHeaderId",
                table: "TransLines",
                newName: "IX_TransLines_reservationHeaderId");

            migrationBuilder.AddColumn<Guid>(
                name: "TransHeader_id",
                table: "ReservationRoomLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationRoomLines_TransHeaders_TransHeader_id",
                table: "ReservationRoomLines",
                column: "TransHeader_id",
                principalTable: "TransHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_ReservationHeaders_reservationHeaderId",
                table: "TransLines",
                column: "reservationHeaderId",
                principalTable: "ReservationHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransLines_ReservationRoomLines_reservationRoomLineId",
                table: "TransLines",
                column: "reservationRoomLineId",
                principalTable: "ReservationRoomLines",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
