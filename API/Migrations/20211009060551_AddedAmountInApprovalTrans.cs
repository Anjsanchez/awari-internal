using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddedAmountInApprovalTrans : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "grossAmount",
                table: "ApprovalTrans",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "netAmount",
                table: "ApprovalTrans",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "grossAmount",
                table: "ApprovalTrans");

            migrationBuilder.DropColumn(
                name: "netAmount",
                table: "ApprovalTrans");
        }
    }
}
