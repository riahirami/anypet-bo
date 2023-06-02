export enum StatusOption {
    All = '-1',
    Waiting = '0',
    Canceled = '1',
    Validated = '2',
  }

  export const statusOptionString = [
    { value: StatusOption.All, label: "All" },
    { value: StatusOption.Waiting, label: "Waiting" },
    { value: StatusOption.Canceled, label: "Canceled" },
    { value: StatusOption.Validated, label: "Validated" },
  ];