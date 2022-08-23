import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmployeeModel } from './e_model';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-control-e',
  templateUrl: './control-e.component.html',
  styleUrls: ['./control-e.component.css'],
})
export class ControlEComponent implements OnInit {
  formValue!: FormGroup;
  m_empleado: EmployeeModel = new EmployeeModel();
  ListEmpleados!: any;
  mostrarP!: boolean;
  mostrarA!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Nombre: [''],
      Apellido: [''],
      Direccion: [''],
    });
    this.ObtenerEMpleados();
  }

  Mostrar_BAgregar() {
    this.formValue.reset();
    this.mostrarP = true;
    this.mostrarA = false;
  }

  postEmpleadoD() {
    this.m_empleado.nombre = this.formValue.value.Nombre;
    this.m_empleado.apellido = this.formValue.value.Apellido;
    this.m_empleado.direccion = this.formValue.value.Direccion;

    this.api.G_empleado(this.m_empleado).subscribe(
      (res) => {
        console.log(res);
        alert('agregado correctamente');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.ObtenerEMpleados();
      },
      (err) => {
        alert('algo salio mal');
      }
    );
  }

  ObtenerEMpleados() {
    this.api.O_empleado().subscribe((res) => {
      this.ListEmpleados = res;
    });
  }

  EliminarEmpleado(data: any) {
    this.api.E_empleado(data.id).subscribe((res) => {
      alert('datos borrados');
      this.ObtenerEMpleados();
    });
  }

  onEdit(row: any) {
    
    this.mostrarP = false;
    this.mostrarA = true;
    this.m_empleado.id = row.id;
    this.formValue.controls['Nombre'].setValue(row.nombre);
    this.formValue.controls['Apellido'].setValue(row.apellido);
    this.formValue.controls['Direccion'].setValue(row.direccion);
  }

  ActualizarCliente() {
    this.m_empleado.nombre = this.formValue.value.Nombre;
    this.m_empleado.apellido = this.formValue.value.Apellido;
    this.m_empleado.direccion = this.formValue.value.Direccion;
    this.api
      .A_empleado(this.m_empleado, this.m_empleado.id)
      .subscribe((res) => {
        alert('datos del empleado actualizados');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.ObtenerEMpleados();
      });
  }
}
