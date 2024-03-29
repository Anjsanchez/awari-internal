using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Contracts;
using API.Contracts.pages;
using API.Contracts.pages.approval;
using API.Contracts.pages.functionality;
using API.Contracts.pages.inventory;
using API.Contracts.pages.Others;
using API.Contracts.pages.products;
using API.Contracts.pages.reservation;
using API.Contracts.pages.rooms;
using API.Contracts.pages.trans;
using API.Contracts.pages.Users;
using API.Data;
using API.Data.Profiles;
using API.Migrations.Configurations;
using API.Repository;
using API.Repository.pages;
using API.Repository.pages.approval;
using API.Repository.pages.functionality;
using API.Repository.pages.inventory;
using API.Repository.pages.others;
using API.Repository.pages.products;
using API.Repository.pages.reservation;
using API.Repository.pages.rooms;
using API.Repository.pages.trans;
using API.Repository.pages.user;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace API
{
    public class Startup
    {
        public IConfiguration _config { get; }
        private IWebHostEnvironment _env { get; set; }

        public Startup(IConfiguration config, IWebHostEnvironment env)
        {
            _env = env;
            _config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(
            CertificateAuthenticationDefaults.AuthenticationScheme)
            .AddCertificate();

            services.Configure<jwtConfig>(_config.GetSection("JwtConfig"));


            if (_env.IsDevelopment())
            {
                if (Environment.MachineName == "HLPHVB51000032")
                {
                    services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                                (_config.GetConnectionString("laptopDevConnection")));
                }
                else if (Environment.MachineName.ToLower().Contains("doggoknight"))
                {
                    services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                                (_config.GetConnectionString("doggoConnection")));
                }
                else if (Environment.MachineName == "PHESL51318")
                {
                    services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                                (_config.GetConnectionString("PHESLConnection")));
                }
                else if (Environment.MachineName == "PRSP")
                {
                    services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                                (_config.GetConnectionString("PRSPConnection")));
                }
                else
                {
                    services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
                                (_config.GetConnectionString("desktopDevConnection")));
                }
            }
            if (_env.IsProduction())
            {
                services.AddDbContext<resortDbContext>(opt => opt.UseSqlServer
               (_config.GetConnectionString("productionConnection")));
            }


            services.AddControllers().AddNewtonsoftJson(s =>
            {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddAuthentication(options =>
           {
               options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
               options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

           }).AddJwtBearer(jwt =>
           {
               var key = Encoding.ASCII.GetBytes(_config["JwtConfig:Secret"]);

               jwt.SaveToken = true;
               jwt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(key),
                   ValidateIssuer = false,
                   ValidateAudience = false,
                   ValidateLifetime = true,
                   RequireAudience = false
               };
           });



            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IDiscountRepository, DiscountRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IRoomVariantRepository, RoomVariantRepository>();
            services.AddScoped<IRoomPricingRepository, RoomPricingRepository>();
            services.AddScoped<IProductTypeRepository, ProductTypeRepository>();
            services.AddScoped<ITravelAgencyRepository, TravelAgencyRepository>();
            services.AddScoped<IEmployeeRoleRepository, EmployeeRoleRepository>();
            services.AddScoped<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddScoped<IInventoryRepository, InventoryRepository>();
            services.AddScoped<IReservationTypeRepository, ReservationTypeRepository>();
            services.AddScoped<IReservationTransRepository, ReservationTransRepository>();
            services.AddScoped<IReservationHeaderRepository, ReservationHeaderRepository>();
            services.AddScoped<IReservationPaymentRepository, ReservationPaymentRepository>();
            services.AddScoped<IReservationApprovalRepository, ReservationApprovalRepository>();
            services.AddScoped<IReservationRoomLineRepository, ReservationRoomLineRepository>();

            services.AddScoped<IApprovalHeaderRepository, ApprovalHeadersRepository>();
            services.AddScoped<IApprovalPaymentRepository, ApprovalPaymentRepository>();
            services.AddScoped<IApprovalTransRepository, ApprovalTransRepository>();
            services.AddScoped<IApprovalRoomRepository, ApprovalRoomRepository>();

            //..TRANS
            services.AddScoped<ITransLineRepository, TransLineRepository>();
            services.AddScoped<ITransRoomRepository, TransRoomRepository>();
            services.AddScoped<ITransHeaderRepository, TransHeaderRepository>();
            services.AddScoped<ITransHeaderRepository, TransHeaderRepository>();
            services.AddScoped<ITransPaymentRepository, TransPaymentRepository>();


            services.AddAutoMapper(typeof(resortProfile));


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images"
            });

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<resortDbContext>();
                context.Database.Migrate();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
