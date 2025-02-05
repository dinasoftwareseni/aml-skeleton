import { configurationDocumentsApiService } from '../configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { mockBrowserSession } from '../__mocks__/session'

const mockedFetch = jest.spyOn(window, 'fetch')
const mockConfigurationAppointments = [
  {
    id: 'some_id',
    value: 'some_value',
  },
] as ListItemModel[]

describe('configurationAppointmentsApiService', () => {
  it('should return a response from the config service', async () => {
    mockedFetch.mockReturnValueOnce({ json: jest.fn(() => mockConfigurationAppointments), ok: true } as any)
    expect(await configurationDocumentsApiService(mockBrowserSession)).toEqual(mockConfigurationAppointments)
    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })

  it('should catch an error if no response from config service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce({ ok: false } as any)
    await configurationDocumentsApiService(mockBrowserSession)
    expect(errorSpy).toHaveBeenCalledWith(
      'Error fetching Configuration Appointment Types',
      'No response returned by API',
    )
  })
})
