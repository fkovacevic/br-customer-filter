import { Injectable, signal } from '@angular/core';
import { EventAttribute, FunnelStep } from '../../models/formModels/funnelStep.formModel';

@Injectable({ providedIn: 'root' })
export class CustomerFilterStore {
  funnelSteps = signal<FunnelStep[]>([{ id: crypto.randomUUID(), event: null, attributes: [] }]);

  addFunnelStep(): void {
    this.funnelSteps.update((steps) => [...steps, {
      id: crypto.randomUUID(),
      event: null,
      attributes: [],
    }]);
  }

  // FILIP: makni partial
  editFunnelStep(funnelStepId: string, changes: Partial<FunnelStep>): void {
    this.funnelSteps.update((steps) =>
      steps.map((step) => (step.id === funnelStepId ? { ...step, ...changes } : step)),
    );
  }

  deleteFunnelStep(funnelStepId: string): void {
    this.funnelSteps.update((steps) => steps.filter((step) => step.id !== funnelStepId));
  }

  copyFunnelStep(funnelStepId: string): void {
    const step = this.funnelSteps().find((_step) => _step.id === funnelStepId);
    if (!step) {
      return;
    }

    this.funnelSteps.update((steps) => [...steps, {
      ...step,
      id: crypto.randomUUID(),
      attributes: step.attributes.map((_attribute) => ({
        ..._attribute,
        id: crypto.randomUUID(),
      })),
    },
    ]);
  }

  resetFunnelSteps(): void {
    this.funnelSteps.set([]);
  }

  addEventAttribute(funnelStepId: string): void {
    this.funnelSteps.update((steps) =>
      steps.map((_step) => {
        if (_step.id !== funnelStepId) {
          return _step;
        }

        return {
          ..._step,
          attributes: [
            ..._step.attributes, {
              id: crypto.randomUUID(),
              property: null,
            },
          ],
        };
      }),
    );
  }

  editEventAttribute(
    funnelStepId: string,
    attributeId: string,
    newEventAttribute: EventAttribute,
  ): void {
    this.funnelSteps.update((steps) =>
      steps.map((_step) => {
        if (_step.id !== funnelStepId) {
          return _step;
        }

        return {
          ..._step,
          attributes: _step.attributes.map((_attribute) => {
            if (_attribute.id !== attributeId) {
              return _attribute;
            }

            return newEventAttribute;
          }),
        };
      }),
    );
  }

  deleteEventAttribute(funnelStepId: string, attributeId: string): void {
    this.funnelSteps.update((steps) =>
      steps.map((_step) => {
        if (_step.id !== funnelStepId) {
          return _step;
        }

        return {
          ..._step,
          attributes: _step.attributes.filter((_attribute) => _attribute.id !== attributeId),
        };
      }),
    );
  }
}
