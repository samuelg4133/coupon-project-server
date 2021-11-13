export interface CreateEmployeeDTO {
  name: string;
  cpf: string;
  companyId: string;
}

export interface UpdateEmployeeDTO {
  companyId: string;
  id: string;
  isActive: boolean;
  name: string;
}
