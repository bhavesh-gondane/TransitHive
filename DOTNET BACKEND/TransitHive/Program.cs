using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TransitHive.Data;
using TransitHive.Helpers;
using TransitHive.Interfaces.Repositories;
using TransitHive.Interfaces.Services;
using TransitHive.Middleware;
using TransitHive.Repositories;
using TransitHive.Services;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 23))));
builder.Services.AddControllers().AddJsonOptions(x =>
{
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

    // ignore omitted parameters on models to enable optional params (e.g. User update)
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TransitHive API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddControllers();

// Add CORS to allow all origins, headers, and methods
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllPolicy",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Add JWT authentication
string jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new Exception("JWT Key is not configured.");
}

var key = Encoding.ASCII.GetBytes(jwtKey);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true // Ensure that the token is not expired
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserPolicy", policy => policy.RequireRole("User"));
    options.AddPolicy("VendorPolicy", policy => policy.RequireRole("Vendor"));
});

// Add Repositories
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<IItemCategoryRepository, ItemCategoryRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();
builder.Services.AddScoped<IBookingItemRepository, BookingItemRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IOtpRepository, OtpRepository>();
// Add Services
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<IItemCategoryService, ItemCategoryService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IBookingItemService, BookingItemService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IOtpService, OtpService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
Stripe.StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];
// Add JwtTokenHelper
builder.Services.AddScoped<JwtTokenHelper>();
builder.Services.AddSingleton<EmailHelper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TransitHive API v1"));
}

app.UseRouting();

app.UseCors("AllowAllPolicy");  // Enable CORS

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();

app.Run();



//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using TransitHive.Data;
//using TransitHive.Helpers;
//using TransitHive.Interfaces.Repositories;
//using TransitHive.Interfaces.Services;
//using TransitHive.Middleware;
//using TransitHive.Repositories;
//using TransitHive.Services;
//using Microsoft.OpenApi.Models;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddDbContext<AppDbContext>(options =>
//    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 23))));

//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TransitHive API", Version = "v1" });
//});
//builder.Services.AddControllers();

//// Add CORS to allow all origins, headers, and methods
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllPolicy",
//        builder => builder.AllowAnyOrigin()
//                          .AllowAnyHeader()
//                          .AllowAnyMethod());
//});

//// Add JWT authentication
//string jwtKey = builder.Configuration["Jwt:Key"];
//if (string.IsNullOrEmpty(jwtKey))
//{
//    throw new Exception("JWT Key is not configured.");
//}

//var key = Encoding.ASCII.GetBytes(jwtKey);
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.RequireHttpsMetadata = false;
//    options.SaveToken = true;
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = false,
//        ValidateAudience = false,
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(key),
//        ValidateLifetime = true // Ensure that the token is not expired
//    };
//});

//// Add Repositories
//builder.Services.AddScoped<IAdminRepository, AdminRepository>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IVendorRepository, VendorRepository>();
//builder.Services.AddScoped<IItemCategoryRepository, ItemCategoryRepository>();
//builder.Services.AddScoped<IItemRepository, ItemRepository>();
//builder.Services.AddScoped<IBookingRepository, BookingRepository>();
//builder.Services.AddScoped<IBookingItemRepository, BookingItemRepository>();
//builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
//builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
//builder.Services.AddScoped<IAuthRepository, AuthRepository>();

//// Add Services
//builder.Services.AddScoped<IAdminService, AdminService>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IVendorService, VendorService>();
//builder.Services.AddScoped<IItemCategoryService, ItemCategoryService>();
//builder.Services.AddScoped<IItemService, ItemService>();
//builder.Services.AddScoped<IBookingService, BookingService>();
//builder.Services.AddScoped<IBookingItemService, BookingItemService>();
//builder.Services.AddScoped<IPaymentService, PaymentService>();
//builder.Services.AddScoped<IReviewService, ReviewService>();
//builder.Services.AddScoped<IAuthService, AuthService>();

//// Add JwtTokenHelper
//builder.Services.AddScoped<JwtTokenHelper>();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseDeveloperExceptionPage();
//    app.UseSwagger();
//    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TransitHive API v1"));
//}

//app.UseRouting();
//app.UseCors("AllowAllPolicy");
//app.UseAuthentication();
//app.UseAuthorization();

//app.UseMiddleware<ExceptionMiddleware>();

//app.MapControllers();

//app.Run();
