export enum StatusOption {
    All = '-1',
    Waiting = '0',
    Canceled = '1',
    Validated = '2',
    Reserved = '3',
    Adopted = '4',
  }

  export const statusOptionString = [
    { value: StatusOption.All, label: "All" },
    { value: StatusOption.Waiting, label: "Waiting" },
    { value: StatusOption.Canceled, label: "Canceled" },
    { value: StatusOption.Validated, label: "Validated" },
    { value: StatusOption.Reserved, label: "Reserved" },
    { value: StatusOption.Adopted, label: "Adopted" },
  ];