using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Contracts
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<ICollection<T>> FindAll();
        Task<T> FindById(Guid id);
        Task<bool> Create(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
        Task<bool> Save();
    }
}