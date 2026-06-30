import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer domain events tests", () => {
  describe("CustomerCreatedEvent", () => {
    it("should register both handlers for CustomerCreatedEvent", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length,
      ).toBe(2);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0],
      ).toMatchObject(eventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1],
      ).toMatchObject(eventHandler2);
    });

    it("should notify and execute both handlers when CustomerCreatedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      const spyHandler1 = jest.spyOn(eventHandler1, "handle");
      const spyHandler2 = jest.spyOn(eventHandler2, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "1",
        name: "John",
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyHandler1).toHaveBeenCalledTimes(1);
      expect(spyHandler1).toHaveBeenCalledWith(customerCreatedEvent);
      expect(spyHandler2).toHaveBeenCalledTimes(1);
      expect(spyHandler2).toHaveBeenCalledWith(customerCreatedEvent);
    });

    it("should print the expected messages in the console for each handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      const spyConsoleLog = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "1",
        name: "John",
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyConsoleLog).toHaveBeenCalledWith(
        "Esse é o primeiro console.log do evento: CustomerCreated",
      );
      expect(spyConsoleLog).toHaveBeenCalledWith(
        "Esse é o segundo console.log do evento: CustomerCreated",
      );
      expect(spyConsoleLog).toHaveBeenCalledTimes(2);

      spyConsoleLog.mockRestore();
    });
  });

  describe("CustomerAddressChangedEvent", () => {
    it("should register the handler for CustomerAddressChangedEvent", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length,
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0],
      ).toMatchObject(eventHandler);
    });

    it("should notify and execute the handler when CustomerAddressChangedEvent is dispatched", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();
      const spyHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: "1",
        name: "John",
        address: "Street 1, 123, 13330-250 São Paulo",
      });

      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyHandler).toHaveBeenCalledTimes(1);
      expect(spyHandler).toHaveBeenCalledWith(customerAddressChangedEvent);
    });

    it("should print the expected message with id, name and new address", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();

      const spyConsoleLog = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        id: "1",
        name: "John",
        address: "Street 1, 123, 13330-250 São Paulo",
      });

      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyConsoleLog).toHaveBeenCalledWith(
        "Endereço do cliente: 1, John alterado para: Street 1, 123, 13330-250 São Paulo",
      );

      spyConsoleLog.mockRestore();
    });
  });
});
