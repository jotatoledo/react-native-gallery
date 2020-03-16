import React, { useState, FunctionComponent, useContext } from "react";
import { Portal, Snackbar } from "react-native-paper";
import { Asset } from "expo-media-library";

type ContextProps = {
  notify: (v: Asset) => void;
  dismiss: () => void;
};

const DeletedPhotoContext = React.createContext<ContextProps>(undefined);

export const DeletedPhotoNotificationProvider: FunctionComponent = ({
  children
}) => {
  const [isOpen, setOpen] = useState(false);
  const dismiss = () => setOpen(false);
  const notify = (v: Asset) => setOpen(true);

  return (
    <DeletedPhotoContext.Provider value={{ notify, dismiss }}>
      {children}
      <Portal>
        <Snackbar
          duration={4000}
          visible={isOpen}
          onDismiss={dismiss}
          action={{
            label: "Dismiss",
            onPress: dismiss
          }}
        >
          Photo deleted!
        </Snackbar>
      </Portal>
    </DeletedPhotoContext.Provider>
  );
};

export function useDeletedPhotoNotification() {
  const { notify, dismiss } = useContext(DeletedPhotoContext);

  return {
    notify,
    dismiss
  };
}
