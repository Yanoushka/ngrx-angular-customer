import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { MasterService } from "../../_service/master.service";
import {
    addCustomer,
    addCustomerSuccess,
    deleteCustomer,
    deleteCustomerSuccess,
    emptyAction,
    loadCustomer,
    loadCustomerFail,
    loadCustomerSuccess,
    showAlert,
    updateCustomer,
    updateCustomerSuccess
} from "./customer.actions";

@Injectable()
export class CustomerEffects {
    constructor(
        private action$: Actions,
        private service: MasterService,
        private _snackbar: MatSnackBar,
    ) { }

    _loadCustomer = createEffect(() =>
        this.action$.pipe(
            ofType(loadCustomer),
            exhaustMap(() => {
                return this.service.getAllCustomers().pipe(
                    map((data) => {
                        return loadCustomerSuccess({ list: data })
                    }),
                    catchError((_err) => of(loadCustomerFail({ errorMessage: _err.message })))
                )
            })
        )
    )

    _addCustomer = createEffect(() =>
        this.action$.pipe(
            ofType(addCustomer),
            switchMap((action) => {
                return this.service.createCustomer(action.customer).pipe(
                    switchMap(() => {
                        return of(
                            addCustomerSuccess(),
                            showAlert({ message: 'Added success', responseType: 'pass' }))
                    }),
                    catchError((_err) => of(showAlert({ message: 'Added failed', responseType: 'fail' })))
                )
            })
        )
    )

    _updateCustomer = createEffect(() =>
        this.action$.pipe(
            ofType(updateCustomer),
            switchMap((action) => {
                return this.service.updateCustomer(action.customer).pipe(
                    switchMap(() => {
                        return of(
                            updateCustomerSuccess(),
                            showAlert({ message: 'Update success', responseType: 'pass' }))
                    }),
                )
            }),
            catchError((_err) => of(showAlert({ message: 'Update failed', responseType: 'fail' })))
        )
    )

    _deleteCustomer = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCustomer),
            switchMap((action) => {
                return this.service.deleteCustomer(action.id).pipe(
                    switchMap(() => {
                        return of(
                            deleteCustomerSuccess({ id: action.id }),
                            showAlert({ message: 'Delete success', responseType: 'pass' })
                        )
                    }),
                )
            }),
            catchError((_err) => of(showAlert({ message: 'Delete failed', responseType: 'fail' })))
        )
    )

    _showAlert = createEffect(() =>
        this.action$.pipe(
            ofType(showAlert),
            exhaustMap((action) => {
                return this.showSnackBarAlert(action.message, action.responseType).afterDismissed().pipe(
                    map(() => {
                        return emptyAction();
                    })
                )
            })
        ))

    private showSnackBarAlert(message: string, responseType: string = 'fail') {
        let _class = responseType === 'pass' ? 'text-green' : 'text-red';
        return this._snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [_class],
        })
    }
}